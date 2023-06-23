# Project setup

## Dependencies

1. Python 3.9 +

## Env setup

1. Create and activate python virtual environment
2. `pip install -r requirements.txt`


# Database Migrations

We use Alembic for database migrations.

## Creating a Migration

After making changes to the SQLAlchemy models in models.py, run the following command to generate a new migration:

```bash
alembic revision --autogenerate -m "Your message about the migration"
```

This will create a new migration file in the **'alembic/versions'** directory. Review the file to make sure Alembic correctly detected your changes.

## Applying Migrations

To apply all pending migrations, run:

```bash
alembic upgrade head
```

This will update your database schema to match your SQLAlchemy models.

## Rolling Back Migrations

To roll back the most recent migration, run:

```bash
alembic downgrade -1
```

## Viewing Migration History

To see the history of all migrations (applied and unapplied), run:

```bash
alembic history
```

To see the history of applied migrations, run:

```bash

alembic current
```
