;(function(){
	new Vue({
		data:{
			title:"todo jobs",
			jobs:[
			],
			allJobsDone:false,
			editingJobIndex:-1,
		},
		methods:{
			//添加任务,在编辑栏输入任务后，enter键调用事件
			addTotoJob(e){
				const info = e.target.value.trim();
				e.target.value ='';
				if (!info.length){
					return false;
				}
				let l = this.jobs.length;
				let id = 1;
				if (l>0) {
					id = this.jobs[l-1].id+1;
				}
				this.jobs.push({id:id,info:info,done:false});
				this.allJobsDone = false;
				e.target.focus()
			},

			//全部完成
			allDone(e){
				if (!this.jobs.length){
					e.target.checked = false;
					return false
				}
				if (e.target.checked){
					this.jobs.forEach(function (job) {
						job.done = true;
					});
				}else {
					this.jobs.forEach(function (job) {
						job.done = false;
					});
				}


			},

			//单个任务完成
			oneDone(e,index){
				this.jobs[index].done = e.target.checked;
				this.allJobsDone = !this.jobs.some(function (job) {
					return !job.done
				});
			},

			//删除单个job
			deleteJob(index){
				this.jobs.splice(index,1);
				if (!this.jobs.length){
					this.allJobsDone = false;
				}
			},
			//esc键清空编辑内容
			cancelWithEsc(e){
				e.target.value = '';
				this.editingJobIndex = -1;
			},

			//获取正在编辑的任务是哪个
			getEditingJob(index){
				this.editingJobIndex = index;
			},

			//保存编辑的任务内容
			saveContent(e,index){
				const val = e.target.value.trim();
				if (!val.length){
					this.jobs.slice(index,1);
					return false
				}

				this.jobs[index].info = val;
				this.editingJobIndex = -1;
			},
			//清除所有done为true的任务
			clearDone(){
				this.jobs = this.jobs.filter(job => !job.done)
				if (!this.jobs.length){
					this.allJobsDone = false;
				}
			}

		}
	}).$mount('#app');
})();
