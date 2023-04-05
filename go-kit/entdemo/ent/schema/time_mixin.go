package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"entgo.io/ent/schema/mixin"
)

type timeMixin struct {
	mixin.Schema
}

func (timeMixin) Fields() []ent.Field {
	return []ent.Field{
		field.Time("created_at").
			Default(time.Now).
			// You can not change the `created_at`
			Immutable().
			Comment("Time that the record created."),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now).
			Comment("Time automatically changed when the record updated."),
		field.Time("deleted_at").
			Default(func() time.Time {
				// zero time for `deleted_at`
				return time.Time{}
			}).
			Comment("Time for soft-deleting, all indices should care about this."),
	}
}

func (timeMixin) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at", "created_at"),
		index.Fields("deleted_at", "updated_at"),
	}
}
