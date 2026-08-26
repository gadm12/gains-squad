from rest_framework.authentication import TokenAuthentication


class CookieAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token_key = request.COOKIES.get("token")

        if not token_key:
            return None

        return self.authenticate_credentials(token_key)