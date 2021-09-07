from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from coins import views

urlpatterns = [
    path('coins/', views.CoinList.as_view()),
    path('coins/<int:pk>/', views.CoinDetail.as_view())
]
# http://example.com/api/items/4.json
urlpatterns = format_suffix_patterns(urlpatterns)