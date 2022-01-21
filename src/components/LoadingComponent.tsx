// import React, { Component } from "react";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// export default class LoadingComponent extends Component {
//   constructor(props: any) {
//     super(props);
//     NProgress.start();
//   }
//   componentDidMount() {
//     NProgress.done();
//   }
//   render() {
//     return <div />;
//   }
// }

export default function Loading(props: any) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}
