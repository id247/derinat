export const OAuthOptions = {
	provider: 'derinatschool.mosreg',
	authUrl: 'https://login.school.mosreg.ru/oauth2',
	grantUrl: 'https://api.school.mosreg.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Lessons,Relatives',	
	clientId: 'd1f4405e12ea455eb6f95bd99c07431e',
	redirectUrl: 'https://ad.school.mosreg.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.school.mosreg.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.school.mosreg.ru/promo/wishlist3',
	server: 'https://school.mosreg.ru',
	cdn: 'https://ad.csdnevnik.ru/special/staging/derinat-app/',
}
