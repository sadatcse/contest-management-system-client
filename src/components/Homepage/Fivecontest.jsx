import React from 'react';

const Fivecontest = () => {
    return (
        <div>
            <p>
            This is a popular contest section show ( minimum 5 contests) (
popular filter by user participation count). For every popular
contest show the following properties:
a. Contest Name
b. Image but design thinking unique
c. Attempted count/ participation count ( participants count and
is it will be the summation of participants )
d. Details button ( when clicking the details redirects to the
details page )
e. Contest short Description ( use slice or …)
Note: When a user is not logged in and if he/ she clicks on the
View Details button, redirect him/
her to the login page. Without a login, you can not visit the
single contests details page.
The section will have a Show All button that will redirect you
to the All Contests page ( /all-contests Route ).
            </p>
        </div>
    );
};

export default Fivecontest;