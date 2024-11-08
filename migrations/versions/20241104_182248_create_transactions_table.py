"""create transactions table

Revision ID: 0a3f97289705
Revises: 88621951fa1e
Create Date: 2024-11-04 18:22:48.379740

"""
from alembic import op
import sqlalchemy as sa



# revision identifiers, used by Alembic.
revision = '0a3f97289705'
down_revision = '88621951fa1e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('portfolio_id', sa.Integer(), nullable=False),
    sa.Column('stock', sa.String(length=5), nullable=False),
    sa.Column('action', sa.String(length=4), nullable=False),
    sa.Column('amount', sa.String(length=2), nullable=False),
    sa.Column('price', sa.String(length=6), nullable=False),
    sa.Column('date_created', sa.Date()),
    sa.ForeignKeyConstraint(['portfolio_id'], ['portfolios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('transactions')
