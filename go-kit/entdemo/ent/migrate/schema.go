// Code generated by ent, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// UsersColumns holds the columns for the "users" table.
	UsersColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "created_at", Type: field.TypeTime},
		{Name: "updated_at", Type: field.TypeTime},
		{Name: "deleted_at", Type: field.TypeTime},
		{Name: "age", Type: field.TypeInt},
		{Name: "name", Type: field.TypeString, Default: "unknown"},
		{Name: "passowrd", Type: field.TypeString, Nullable: true, Default: map[string]schema.Expr{"mysql": "TO_BASE64('123456')", "postgres": "md5('123456')", "sqlite3": "hex('123456')"}},
	}
	// UsersTable holds the schema information for the "users" table.
	UsersTable = &schema.Table{
		Name:       "users",
		Columns:    UsersColumns,
		PrimaryKey: []*schema.Column{UsersColumns[0]},
		Indexes: []*schema.Index{
			{
				Name:    "user_deleted_at_created_at",
				Unique:  false,
				Columns: []*schema.Column{UsersColumns[3], UsersColumns[1]},
			},
			{
				Name:    "user_deleted_at_updated_at",
				Unique:  false,
				Columns: []*schema.Column{UsersColumns[3], UsersColumns[2]},
			},
		},
	}
	// UserCreatedByColumns holds the columns for the "user_created_by" table.
	UserCreatedByColumns = []*schema.Column{
		{Name: "user_id", Type: field.TypeInt},
		{Name: "created_by_id", Type: field.TypeInt},
	}
	// UserCreatedByTable holds the schema information for the "user_created_by" table.
	UserCreatedByTable = &schema.Table{
		Name:       "user_created_by",
		Columns:    UserCreatedByColumns,
		PrimaryKey: []*schema.Column{UserCreatedByColumns[0], UserCreatedByColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "user_created_by_user_id",
				Columns:    []*schema.Column{UserCreatedByColumns[0]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "user_created_by_created_by_id",
				Columns:    []*schema.Column{UserCreatedByColumns[1]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// UserUpdatedByColumns holds the columns for the "user_updated_by" table.
	UserUpdatedByColumns = []*schema.Column{
		{Name: "user_id", Type: field.TypeInt},
		{Name: "updated_by_id", Type: field.TypeInt},
	}
	// UserUpdatedByTable holds the schema information for the "user_updated_by" table.
	UserUpdatedByTable = &schema.Table{
		Name:       "user_updated_by",
		Columns:    UserUpdatedByColumns,
		PrimaryKey: []*schema.Column{UserUpdatedByColumns[0], UserUpdatedByColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "user_updated_by_user_id",
				Columns:    []*schema.Column{UserUpdatedByColumns[0]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "user_updated_by_updated_by_id",
				Columns:    []*schema.Column{UserUpdatedByColumns[1]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		UsersTable,
		UserCreatedByTable,
		UserUpdatedByTable,
	}
)

func init() {
	UserCreatedByTable.ForeignKeys[0].RefTable = UsersTable
	UserCreatedByTable.ForeignKeys[1].RefTable = UsersTable
	UserUpdatedByTable.ForeignKeys[0].RefTable = UsersTable
	UserUpdatedByTable.ForeignKeys[1].RefTable = UsersTable
}
