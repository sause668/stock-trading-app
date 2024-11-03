"""watchlist_transactions_orders

Revision ID: c3aa4dee6df2
Revises: 31079fe82ea8
Create Date: 2024-11-03 18:53:07.171527

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3aa4dee6df2'
down_revision = '31079fe82ea8'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('watchlist_stocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('stock', sa.String(length=5), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )



def downgrade():
    op.drop_table('watchlist_stocks')
