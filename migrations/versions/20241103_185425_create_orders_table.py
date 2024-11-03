"""create orders table

Revision ID: 8f9d4d1ce61b
Revises: b81faaca735f
Create Date: 2024-11-03 18:54:25.103954

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f9d4d1ce61b'
down_revision = 'b81faaca735f'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stock', sa.String(length=5), nullable=False),
    sa.Column('action', sa.String(length=4), nullable=False),
    sa.Column('amount', sa.Numeric(precision=10, scale=5), nullable=False),
    sa.Column('time', sa.DateTime(), nullable=False),
    sa.Column('repeat', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('orders')
