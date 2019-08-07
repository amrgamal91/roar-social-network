import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },

  // the object to be spread
  styleToSpread: {
    invisibleSeparator: {
      border: "none",
      margin: 4
    },
    visibleColoredSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(128,128,128,0.5)",
      marginBottom: 5,
      marginTop: 10
    },
    typography: {
      useNextVariants: true
    },
    image: {
      margin: "20px auto 20px auto"
    },
    button: {
      marginTop: 20,
      position: "relative"
    },
    paper: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 20
    },
    paperHints: {
      order: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "#008394"
        }
      },

      "& .userName": {
        fontFamily: "'Courgette', cursive",

        display: "block",
        textAlign: "center",
        marginLeft: " auto",
        marignRight: "auto"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },

    labels: {
      color: "#00bcd4",
      marginRight: 6
    },
    userDetailsIcons: {
      color: "#00bcd4",
      marginRight: 7
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    },
    root: {
      flexGrow: 1
    },
    logo: {
      marginRight: 15,
      marginTop: 15
    },
    title: {
      fontFamily: "'Courgette', cursive",
      display: "flex",
      justifyContent: "flex-start",
      color: "#fff",
      fontWeight: "Bold",
      fontSize: "2.8rem"
    }
  },

  editDetails: {
    button: { float: "right" },
    paper: {
      padding: 20
    },
    title: {
      color: "#00bcd4",
      fontFamily: "'Courgette', cursive"
    }
  },

  staticProfile: {
    invisibleSeparator: {
      border: "none",
      margin: 4
    },
    visibleColoredSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(128,128,128,0.5)",
      marginBottom: 5,
      marginTop: 10
    },
    typography: {
      useNextVariants: true
    },
    image: {
      margin: "20px auto 20px auto"
    },
    button: {
      marginTop: 20,
      position: "relative"
    },
    paper: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "#008394"
        }
      },

      "& .userName": {
        fontFamily: "'Courgette', cursive",

        display: "block",
        textAlign: "center",
        marginLeft: " auto",
        marignRight: "auto"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },

    labels: {
      color: "#00bcd4",
      marginRight: 6
    },
    userDetailsIcons: {
      color: "#00bcd4",
      marginRight: 7
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    }
  },

  comments: {
    commentImage: {
      maxWidth: "95%",
      height: 100,
      objectFit: "cover",
      borderRadius: "50%"
    },
    commentData: {
      marginLeft: 10
    },
    commentBlock: {
      border: "2px solid rgb(0,	188,	212)",
      borderRadius: 5,
      padding: 5
    },
    userHandle: {
      fontFamily: "'Courgette', cursive"
    }
  },

  deleteRoar: {
    deleteButton: {
      position: "absolute",
      left: "90%",
      top: "10%"
    }
  },

  postRoar: {
    paper: {
      padding: 10
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "#00bcd4"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    submitButton: {
      position: "relative",
      float: "right",
      marginTop: 10
    },
    progressSpinner: {
      position: "absolute"
    },
    closeButton: {
      position: "absolute",
      left: "91%",
      top: "6%"
    }
  },

  roar: {
    card: {
      position: "relative",
      display: "flex",
      marginBottom: 20
    },
    image: {
      minWidth: "30%"
    },
    content: {
      padding: 25,
      objectFit: "cover"
    },
    userhandle: {
      fontFamily: "'Courgette', cursive",
      fontSize: "1.8rem",
      margin: "10px auto 10px auto",
      color: "#00bcd4"
    }
  },

  roarDialog: {
    invisibleSeparator: {
      border: "none",
      margin: 4
    },
    profileImage: {
      maxWidth: 180,
      height: 180,
      borderRadius: "50%",
      objectFit: "cover"
    },
    dialogContent: {
      padding: 20
    },
    closeButton: {
      position: "absolute",
      left: "90%"
    },
    expandButton: {
      position: "absolute",
      left: "90%"
    },
    spinnerDiv: {
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50
    },
    userHandle: {
      fontFamily: "'Courgette', cursive"
    }
  },

  login: {
    paper: {
      padding: 20,
      borderRadius: 10
    },
    form: {
      margin: "0 auto",
      textAlign: "center"
    },
    image: {
      display: "block",
      margin: "20px auto 20px auto"
    },
    pageTitle: {
      fontFamily: "'Courgette', cursive",
      fontWeight: "Bold",
      fontSize: "4.8rem",
      margin: "10px auto 10px auto",
      color: "#00bcd4"
    },
    textField: {
      margin: "10px auto 10px auto"
    },
    button: {
      marginTop: 20,
      position: "relative" // because of progress
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10"
    },
    progress: {
      position: "absolute"
    }
  },

  signup: {
    paper: {
      padding: 20,
      borderRadius: 10
    },
    form: {
      // justifyContent: "center",
      margin: "0 auto",
      textAlign: "center"
    },
    image: {
      margin: "20px auto 20px auto"
    },
    pageTitle: {
      fontFamily: "'Courgette', cursive",
      fontWeight: "Bold",
      fontSize: "4.8rem",
      margin: "10px auto 10px auto",
      color: "#00bcd4"
    },
    textField: {
      margin: "10px auto 10px auto"
    },
    button: {
      marginTop: 20,
      marginBottom: 10,
      position: "relative" // because of progress
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10"
    },
    progress: {
      position: "absolute"
    }
  },

  profileSkeleton: {
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "#008394"
        }
      },

      "& .userName": {
        display: "block",
        textAlign: "center",
        marginLeft: " auto",
        marignRight: "auto"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    handle: {
      height: 20,
      // backgroundColor: theme.palette.primary.main,
      width: 60,
      margin: "0 auto 7px auto"
    },
    fullLine: {
      height: 15,
      backgroundColor: "rgba(0,0,0,0.6)",
      width: "100%",
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      backgroundColor: "rgba(0,0,0,0.6)",
      width: "50%",
      marginBottom: 10
    }
  },

  roarSkeleton: {
    card: {
      display: "flex",
      marginBottom: 20
    },
    cardContent: {
      width: "100%",
      flexDirection: "column",
      padding: 25
    },
    cover: {
      minWidth: 200,
      objectFit: "cover"
    },
    handle: {
      width: 60,
      height: 18,
      // backgroundColor: theme.palette.primary.main,
      marginBottom: 7
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: "rgba(0,0,0, 0.3)",
      marginBottom: 10
    },
    fullLine: {
      height: 15,
      width: "90%",
      backgroundColor: "rgba(0,0,0, 0.6)",
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      width: "50%",
      backgroundColor: "rgba(0,0,0, 0.6)",
      marginBottom: 10
    }
  }
});
export default theme;
