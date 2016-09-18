// export const OAuthOptions = {
// 	provider: 'app',
// 	authUrl: 'https://login.staging.dnevnik.ru/oauth2',
// 	grantUrl: 'https://api.staging.dnevnik.ru/v1/authorizations',
// 	scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,Organizations,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',	
// 	clientId: '5123975fe9eb415390fb7aa316a15e4e',
// 	redirectUrl: '//localhost:9000/oauth.html',
// }

// export const APIoptions = {	
// 	base: 'https://api.staging.dnevnik.ru/v1/',
// }

// export const PromoOptions = {	
// 	url: 'http://localhost:9000',
// 	server: 'https://staging.dnevnik.ru',
// 	cdn: 'http://localhost:9000/assets/',
// }

export const OAuthOptions = {
	provider: 'derinatStaging',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Lessons,Relatives',	
	clientId: '1a3b7aca792d470cae448f41451e2ee1',
	redirectUrl: '//localhost:9000/oauth.html',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'http://localhost:9000',
	server: 'https://staging.dnevnik.ru',
	cdn: 'http://localhost:9000/assets/',
}
