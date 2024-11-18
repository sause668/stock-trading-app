"""create transactions table

Revision ID: 0a3f97289705
Revises: 88621951fa1e
Create Date: 2024-11-04 18:22:48.379740

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime
from pytz import timezone



# revision identifiers, used by Alembic.
revision = '0a3f97289705'
down_revision = 'd408c06c8bb6'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('portfolio_id', sa.Integer(), nullable=False),
    sa.Column('stock', sa.String(length=5), nullable=False),
    sa.Column('action', sa.String(length=4), nullable=False),
    sa.Column('amount', sa.Numeric(precision=10, scale=5), nullable=False),
    sa.Column('price', sa.Numeric(precision=10, scale=5), nullable=False),
    sa.Column('date_created', sa.DateTime(), default=datetime.now().astimezone(timezone('US/Eastern'))),
    sa.ForeignKeyConstraint(['portfolio_id'], ['portfolios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('transactions')
