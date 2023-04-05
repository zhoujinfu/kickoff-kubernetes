package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/field"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

func (User) Mixin() []ent.Mixin {
	return []ent.Mixin{
		timeMixin{},
		operatorMixin{},
	}
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.Int("age").
			Positive().
			Comment("Age of the user."),
		field.String("name").
			Default("unknown").
			Comment("Name of the user, defaults to \"unknown\"."),
		field.String("passowrd").
			Optional().
			Annotations(
				entsql.DefaultExprs(map[string]string{
					dialect.MySQL:    "TO_BASE64('123456')",
					dialect.SQLite:   "hex('123456')",
					dialect.Postgres: "md5('123456')",
				}),
			).
			Sensitive().
			Comment("Password of the user."),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{}
}

// Indexes of the User.
func (User) Indexes() []ent.Index {
	return []ent.Index{}
}
