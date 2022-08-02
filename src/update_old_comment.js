import * as core from "@actions/core"

import {getExistingComments} from './comment'

export async function updateOldComment(github, options, context, body) {

	const existingComments = await getExistingComments(github, options, context)

	if (existingComments.length === 0) {
		// No existing comments, so nothing to do here
		return false
	}

	const [mostRecentComment] = existingComments.slice(-1)

	if (!body.includes(":recycle:")) {
		body = `${body}\n:recycle: This comment has been updated with latest coverage results.`
	}

	try { 
		core.debug(`Updating existing comment: ${mostRecentComment.id}`)
		await github.issues.updateComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			comment_id: mostRecentComment.id,
			body: body
		})
		return true
	} catch (error) {
		console.warn(err)
		return false
	}

}
