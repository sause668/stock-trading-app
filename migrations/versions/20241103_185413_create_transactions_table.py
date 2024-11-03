"""create transactions table

Revision ID: b81faaca735f
Revises: c3aa4dee6df2
Create Date: 2024-11-03 18:54:13.421978

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b81faaca735f'
down_revision = 'c3aa4dee6df2'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('portfolioId', sa.Integer(), nullable=False),
    sa.Column('stock', sa.String(length=5), nullable=False),
    sa.Column('action', sa.String(length=4), nullable=False),
    sa.Column('amount', sa.Numeric(precision=10, scale=5), nullable=False),
    sa.Column('price', sa.Numeric(precision=10, scale=5), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('transactions')
