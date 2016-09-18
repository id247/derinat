export const OAuthOptions = {
	provider: 'derinatDnevnik',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Lessons,Relatives',	
	clientId: '1a3b7aca792d470cae448f41451e2ee1',
	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.dnenvik.ru/promo/wishlist3',
	server: 'https://dnevnik.ru',
	cdn: 'https://ad.csdnevnik.ru/special/staging/derinat-app/',
}
