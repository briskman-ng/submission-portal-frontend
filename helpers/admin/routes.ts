const dashboard = () => "/admin/dashboard";

const signIn = () => "/admin/sign-in";

const submissions = () => dashboard() + "/submissions";
const viewSubmission = (submissionId: string) =>
  submissions() + "/" + submissionId;

const adminRoutes = {
  dashboard,
  signIn,
  submissions,
  viewSubmission,
};

export default adminRoutes;
