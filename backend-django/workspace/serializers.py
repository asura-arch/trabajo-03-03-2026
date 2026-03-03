from rest_framework import serializers

from .models import Board, Component


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'board', 'title', 'x', 'y', 'width', 'height', 'data']
        read_only_fields = ['id']


class BoardSerializer(serializers.ModelSerializer):
    components = ComponentSerializer(many=True, read_only=True)

    class Meta:
        model = Board
        fields = ['id', 'name', 'components']
        read_only_fields = ['id']
