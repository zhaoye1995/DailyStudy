//Promis 构造函数
function Promise(executor) {
	let self = this
	let status = 'pending'
	let success = undefined
	let error = undefined
	let onSuccessCallbacks = [] //存放成功的回调
	let onErrorCallbacks = []

	function resolve(success) {
		if(self.status === 'pending') {
			self.status = 'resolved'
			self.success = success
			self.onSuccessCallbacks.forEach(item => {
				item()
			})
		}
	}
	function reject(error) {
		if(self.status === 'pending') {
			self.status = 'rejected'
			self.error = error
			self.onErrorCallbacks.forEach(item => {
				item()
			})
		}
	}
	try {
		executor(resolve, reject)
	} catch(err) {
		reject(err)
	}
}

//简化版
Promise.prototype.then = function (onResolved, onRejected) {
	let self = this
	if(self.status === 'pending') {
		self.onSuccessCallbacks.push(() => {
			onResolved(self.success)
		})
		self.onErrorCallbacks.push(() => {
			onRejected(self.error)
		})
	}
	if(self.status === 'resolved') {
		onResolved(self.success)
	}
	if(self.status === 'rejected') {
		onRejected(self.error)
	}
}

//链式调用
//TODO

/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * 
 * promise2
 * 
 * async1 end
 * settimeout
 */