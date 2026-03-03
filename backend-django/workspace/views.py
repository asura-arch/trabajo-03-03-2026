from rest_framework import viewsets, permissions

from .models import Board, Component
from .serializers import BoardSerializer, ComponentSerializer


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Board.objects.filter(owner=self.request.user)


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Component.objects.filter(board__owner=self.request.user)
