const mutations = {
	  	changeLogin(state){
		    state.isLogin = !Boolean(Number(sessionStorage.getItem('isLogin')));
			sessionStorage.setItem('isLogin',state.isLogin?'1':'0');
		},
		changeNight(state){
			state.night = !state.night;
		},
		fullScreen(state){
			state.fullScreen = !state.fullScreen;
		}
    
}




export default mutations