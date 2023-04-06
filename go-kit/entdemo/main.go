package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

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
	store = loggingMiddleware{store} // store AOP
	var service UserService
	service = userService{store}
	service = emptyMiddleware{service} // service AOP

	service.InsertWithNameAge("admin1", 31)
	// service.QueryByName("admin")
	// service.QueryByDeleted(true)
	log.Println("msg", "HTTP", "addr", ":8080")
	log.Println("err", http.ListenAndServe(":8080", httpHandler()))
}

type UserService interface {
	InsertWithNameAge(name string, age int) (*ent.User, error)
	QueryByName(name string) (*ent.User, error)
	QueryByDeleted(deleted bool) ([]*ent.User, error)
}
type userService struct{ store Store }

func (u userService) InsertWithNameAge(name string, age int) (*ent.User, error) {
	return u.store.InsertUser(name, age)
}
func (u userService) QueryByName(name string) (*ent.User, error) {
	return u.store.QueryUserByName(name)
}
func (u userService) QueryByDeleted(deleted bool) ([]*ent.User, error) {
	return u.store.QueryUsersByDeleted(deleted)
}

type emptyMiddleware struct {
	service UserService
}

func (mw emptyMiddleware) InsertWithNameAge(name string, age int) (*ent.User, error) {
	return mw.service.InsertWithNameAge(name, age)
}
func (mw emptyMiddleware) QueryByName(name string) (*ent.User, error) {
	return mw.service.QueryByName(name)
}
func (mw emptyMiddleware) QueryByDeleted(deleted bool) ([]*ent.User, error) {
	return mw.service.QueryByDeleted(deleted)
}

type Store interface {
	InsertUser(name string, age int) (*ent.User, error)
	QueryUserByName(name string) (*ent.User, error)
	QueryUsersByDeleted(deleted bool) ([]*ent.User, error)
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
		return nil, err
	}
	return u, nil
}
func (s *sqlite3Store) QueryUserByName(name string) (*ent.User, error) {
	u, err := s.client.User.
		Query().
		Where(user.Name(name)).
		// `Only` fails if no user found,
		// or more than 1 user returned.
		Only(s.ctx)
	if err != nil {
		return nil, err
	}
	return u, nil
}
func (s *sqlite3Store) QueryUsersByDeleted(deleted bool) ([]*ent.User, error) {
	zero := time.Time{}
	q := s.client.User.Query()
	if !deleted {
		return q.Where(user.DeletedAt(zero)).All(s.ctx)
	} else {
		return q.Where(user.Not(user.DeletedAt(zero))).All(s.ctx)
	}
}

type loggingMiddleware struct {
	store Store
}

func (mw loggingMiddleware) InsertUser(name string, age int) (*ent.User, error) {
	u, err := mw.store.InsertUser(name, age)
	if err != nil {
		return nil, fmt.Errorf("failed creating user: %w", err)
	} else {
		log.Println("user was created: ", u)
	}
	return u, err
}
func (mw loggingMiddleware) QueryUserByName(name string) (*ent.User, error) {
	u, err := mw.store.QueryUserByName(name)
	if err != nil {
		return nil, fmt.Errorf("failed querying user: %w", err)
	} else {
		log.Println("user queried: ", u)
	}
	return u, err
}
func (mw loggingMiddleware) QueryUsersByDeleted(deleted bool) ([]*ent.User, error) {
	u, err := mw.store.QueryUsersByDeleted(deleted)
	if err != nil {
		return nil, fmt.Errorf("failed quering users: %w", err)
	} else {
		log.Println("user queried: ", u)
	}
	return u, err
}
