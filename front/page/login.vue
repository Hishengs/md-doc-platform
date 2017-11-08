<template>
	<div id="login">
		<div class="inner">
			<h3>请输入通行码</h3>
			<Input type="password" v-model="verifyCode" placeholder="请输入通行码" @on-enter="verify"></Input>
			<Button type="primary" @click="verify" long>进入</Button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data (){
			return {
				verifyCode: '',
			};
		},
		methods: {
			verify (){
				if(this.verifyCode === 'Passw0rd'){
					// window.verified = true;
					localStorage.setItem('verified', true);
					this.$router.push('/');
				}else {
					this.$Message.error('通行码不正确');
				}
			},
		}
	};
</script>

<style lang= "less">
	#login {
		z-index: 999;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ffffff;
		.inner {
			width: 300px;
			padding-top: 150px;
			margin: 0 auto;
			text-align: center;
			.ivu-input {
				margin: 15px 0;
			}
		}
	}
</style>