from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BoardViewSet, ComponentViewSet

router = DefaultRouter()
router.register(r'boards', BoardViewSet, basename='board')
router.register(r'components', ComponentViewSet, basename='component')

urlpatterns = [
    path('', include(router.urls)),
]
