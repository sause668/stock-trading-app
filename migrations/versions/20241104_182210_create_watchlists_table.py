"""table

Revision ID: 88621951fa1e
Revises: 31079fe82ea8
Create Date: 2024-11-04 18:22:10.980858

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88621951fa1e'
down_revision = '001652c77aaa'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('watchlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=5), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('watchlists')
