package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/mixin"
)

type operatorMixin struct {
	mixin.Schema
}

func (operatorMixin) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("created_by", User.Type).
			Immutable().
			Comment("User ID who created the user."),
		edge.To("updated_by", User.Type).
			Immutable().
			Comment("User ID who updatedd the user."),
	}
}
