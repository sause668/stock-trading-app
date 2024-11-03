"""Create portfolios table

Revision ID: 31079fe82ea8
Revises: ffdc0a98111c
Create Date: 2024-11-02 15:06:24.853183

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '31079fe82ea8'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('portfolios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('money', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('portfolios')
    # ### end Alembic commands ###
