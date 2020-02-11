import React from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import Loading from "../../../../../global/components/Loading";

import ResumeReviewEntry from "../ResumeReviewEntry";
import { ACCEPTED_RESUME_REVIEWS, UPDATE_RESUME_REVIEW } from "../../Resolvers";

import "../ReviewJobsCard.scss";

//SVG IMAGE
import resumeQ1 from "../../../../../global/icons/resumeQ1.svg";

const AcceptedReviews = () => {
const { loading, data, refetch } = useQuery(ACCEPTED_RESUME_REVIEWS, {
    fetchPolicy: "network-only"
});

const [updateResumeReview] = useMutation(UPDATE_RESUME_REVIEW, {
    refetchQueries: [
    {
        query: ACCEPTED_RESUME_REVIEWS,
        variables: {
        awaitRefetchQueries: true,
        fetchPolicy: "network-only"
        }
    }
    ],
    onCompleted: () => {
    console.log(`updateResumeReview completed`);
      console.log(`updateResumeReview >> refetchQueries // data`, data);
    }
});

console.log(`AcceptedReviews / data`, data);

return (
    <div>
    {!loading && !data.acceptedResumeReviews.length && (
        <div>
        <div className="resumeQ1">
            <img src={resumeQ1} />
            <p>You currently have no accepted reviews at this time...</p>
        </div>
        </div>
    )}
    {loading && <Loading />}
    {!loading && data.acceptedResumeReviews && (
        <div className="reviewer-jobs-list">
        {data.acceptedResumeReviews.map(entry => (
            <ResumeReviewEntry
            entry={entry}
            key={entry.id}
            updateResumeReview={updateResumeReview}
            refetch={refetch}
            status={"In Progress"}
            />
        ))}
        </div>
    )}
    </div>
);
};

export default AcceptedReviews;
