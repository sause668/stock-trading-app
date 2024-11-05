"""create orders table

Revision ID: eb476869ebe1
Revises: 0a3f97289705
Create Date: 2024-11-04 18:22:56.034011

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eb476869ebe1'
down_revision = '0a3f97289705'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('portfolio_id', sa.Integer(), nullable=False),
    sa.Column('stock', sa.String(length=5), nullable=False),
    sa.Column('action', sa.String(length=4), nullable=False),
    sa.Column('amount', sa.Numeric(precision=10, scale=5), nullable=False),
    sa.Column('time', sa.DateTime(), nullable=False),
    sa.Column('repeat', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['portfolio_id'], ['portfolios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('orders')
