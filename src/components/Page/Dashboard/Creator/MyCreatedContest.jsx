import React from 'react';

const MyCreatedContest = () => {
    return (
        <div>
            <p>
            My Created Contest: If a creator visits this page, he/she can
see all the contests he/she posted. Show them in tabular form.
Each row will have edit and delete buttons for the contest, By
default the contest status will be pending. If an admin
approves the contest the status changes to accepted. The
contest will then appear on the all-contest page. Also if an
admin accepts the contest the creator can not edit and delete
the contest. Only an admin can delete the contest after this.
Also, keep a see submission button for every contest. Clicking
on this redirects him/her to the contest-submitted page.

            </p>
        </div>
    );
};

export default MyCreatedContest;