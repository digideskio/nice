Meteor.methods({
	'user.follow' (targetId) {
		let user = Users.findOne({_id: this.userId})
		let tUser = Users.findOne({_id: targetId})
		if (!_.contains(user.following, tUser._id) &&
        !_.contains(tUser.followers, user._id)) {
      Users.update({_id: user._id}, {$push: {following: tUser._id}})
      Users.update({_id: tUser._id}, {$push: {followers: user._id}})
    }
	},
	'user.unfollow' (targetId) {
		let user = Users.findOne({_id: this.userId})
		let tUser = Users.findOne({_id: targetId})
		if (_.contains(user.following, tUser._id) &&
        _.contains(tUser.followers, user._id)) {
      Users.update({_id: user._id}, {$pull: {following: tUser._id}})
      Users.update({_id: tUser._id}, {$pull: {followers: user._id}})
    }
	},
	'user.addVerified' (targetId) {
		if (!Roles.userIsInRole(targetId, 'verified') &&
				Roles.userIsInRole(this.userId, 'admin')) {
			Roles.addUsersToRoles(targetId, 'verified')
		}
	}
})
