"""create watchlist stocks table

Revision ID: d408c06c8bb6
Revises: ae61ce21dd5c
Create Date: 2024-11-09 13:06:22.628175

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd408c06c8bb6'
down_revision = '88621951fa1e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('watchlist_stocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('watchlist_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=5), nullable=False),
    sa.Column('value', sa.String(length=10), nullable=False),
    sa.ForeignKeyConstraint(['watchlist_id'], ['watchlists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('watchlist_stocks')
