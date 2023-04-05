package main

import (
	"context"
	"fmt"
	"log"

	"entdemo/ent"
	"entdemo/ent/user"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// https://github.com/mattn/go-sqlite3#connection-string
	client, err := ent.Open("sqlite3", "file:ent.db?mode=rwc&cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}
	defer client.Close()
	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	var store Store
	store = &sqlite3Store{client, context.Background()}
	store = loggingMiddleware{store}
	store.InsertUser("tinychou", 35)
}

type Store interface {
	InsertUser(name string, age int) (*ent.User, error)
	QueryUserByName(name string) (*ent.User, error)
}
type sqlite3Store struct {
	client *ent.Client
	ctx    context.Context
}

func (s *sqlite3Store) InsertUser(name string, age int) (*ent.User, error) {
	u, err := s.client.User.
		Create().
		SetAge(age).
		SetName(name).
		Save(s.ctx)
	if err != nil {
		return nil, fmt.Errorf("failed creating user: %w", err)
	}
	return u, nil
}
func (s *sqlite3Store) QueryUserByName(name string) (*ent.User, error) {
	u, err := s.client.User.
		Query().
		Where(user.Name("a8m2")).
		// `Only` fails if no user found,
		// or more than 1 user returned.
		Only(s.ctx)
	if err != nil {
		return nil, fmt.Errorf("failed querying user: %w", err)
	}
	return u, nil
}

type loggingMiddleware struct {
	store Store
}

func (mw loggingMiddleware) InsertUser(name string, age int) (*ent.User, error) {
	u, err := mw.store.InsertUser(name, age)
	if err == nil {
		log.Println("user was created: ", u)
	}
	return u, err
}
func (mw loggingMiddleware) QueryUserByName(name string) (*ent.User, error) {
	u, err := mw.store.QueryUserByName(name)
	if err == nil {
		log.Println("user queried: ", u)
	}
	return u, err
}
