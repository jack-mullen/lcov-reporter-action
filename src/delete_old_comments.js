import * as core from "@actions/core"
import {getExistingComments} from './comment'

export async function deleteOldComments(github, options, context) {
	const existingComments = await getExistingComments(github, options, context)
	for (const comment of existingComments) {
		core.debug(`Deleting comment: ${comment.id}`)
		try {
			await github.issues.deleteComment({
				owner: context.repo.owner,
				repo: context.repo.repo,
				comment_id: comment.id,
			})
		} catch (error) {
			console.error(error)
		}
	}
}
