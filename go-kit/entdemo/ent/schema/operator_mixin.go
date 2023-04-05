package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

type operatorMixin struct {
	mixin.Schema
}

func (operatorMixin) Fields() []ent.Field {
	return []ent.Field{
		field.Int("created_by").
			Default(0).
			Immutable().
			Comment("User ID who created the record."),
		field.Int("updated_by").
			Default(0).
			Comment("User ID who updated the record."),
	}
}
