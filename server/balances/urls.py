from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from balances.views import BalanceDetail, BalanceList

urlpatterns = [
    path('balances/', BalanceList.as_view()),
    path('balances/<int:pk>/', BalanceDetail.as_view()),
]
# http://example.com/api/items/4.json
urlpatterns = format_suffix_patterns(urlpatterns)