from django.db import models
from django.conf import settings


class Board(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Component(models.Model):
    board = models.ForeignKey(Board, related_name='components', on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True, default='')
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    width = models.IntegerField(default=100)
    height = models.IntegerField(default=100)
    data = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"Component {self.id} on {self.board}"
