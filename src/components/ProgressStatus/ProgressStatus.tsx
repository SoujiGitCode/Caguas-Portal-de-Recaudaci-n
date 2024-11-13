import React from "react";
import { Box, Typography } from "@mui/material";

interface Steps {
  Title: string;
  SubTitle: string;
}

interface ProgressStatusProps {
  activeStep: number;
  horizontal?: boolean;
  fontSize?: number;
  disableText?: boolean;
  Steps: Steps[];
}

const ProgressStatus: React.FC<ProgressStatusProps> = ({
  activeStep,
  horizontal = false,
  fontSize,
  disableText,
  Steps,
}) => {
  const listSteps: number[] = [];

  const LineLayout: React.FC = () => {
    const result = listSteps.map((step) => (
      <Box
        key={step}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: horizontal ? "row" : "column",
          alignItems: "center",
          ...(horizontal && { width: "100%" }),
          ...(step < Steps.length && { height: "100%" }),
        }}
      >
        <div
          style={{
            minHeight: "1.5rem",
            minWidth: "1.5rem",
            backgroundColor: activeStep >= step ? "orange" : "white",
            borderRadius: "100%",
            border: "2px solid white",
          }}
        />
        {step < Steps.length - 1 && (
          <div
            style={{
              background: activeStep > step ? "orange" : "white",
              ...(horizontal
                ? { width: "100%", height: "0.5rem" }
                : { height: "100%", width: "0.5rem" }),
            }}
          />
        )}

        {step === Steps.length - 2 && (
          <div
            style={{
              minHeight: "1.5rem",
              minWidth: "1.5rem",
              backgroundColor: activeStep >= step + 1 ? "orange" : "white",
              borderRadius: "100%",
              border: "2px solid white",
            }}
          />
        )}
      </Box>
    ));

    return (
      <Box
        sx={{
          display: "flex",
          ...(horizontal
            ? {
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }
            : {
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
            }),
        }}
      >
        {result}
      </Box>
    );
  };

  const Titles = Steps.map((step, index) => {
    if (Steps.length > index + 1) listSteps.push(index);

    return (
      <Box
        sx={{
          ...(horizontal
            ? {
              display: "flex",
              flexDirection: "row",
            }
            : {
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }),
        }}
        key={index}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            justifyContent: "end",
            display: "flex",
            ...(fontSize
              ? {
                fontSize: `${fontSize}rem !important`,
              }
              : {
                fontSize: "1.2rem !important",
              }),
          }}
        >
          {step.Title}
        </Typography>
        {!horizontal && (
          <Typography
            sx={{
              color: "white",
              ...(fontSize
                ? {
                  fontSize: `${fontSize}rem !important`,
                }
                : {
                  fontSize: "1.2rem !important",
                }),
            }}
          >
            {step.SubTitle}
          </Typography>
        )}
      </Box>
    );
  });

  return (
    <Box
      sx={{
        backgroundColor: "#697FAA",
        width: '100%',
        ...(horizontal
          ? {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "auto",
            padding: "2rem",
          }
          : {
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            height: "100%",
            padding: "1rem",
          }),
      }}
    >
      {disableText ? (
        <></>
      ) : (
        <Box
          sx={{
            ...(horizontal
              ? {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingLeft: "1rem",
                paddingRight: "1rem !important",
              }
              : {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.3rem",
                height: "100%",
              }),
          }}
        >
          {Titles}
        </Box>
      )}

      <Box sx={{}}>
        <LineLayout />
      </Box>
    </Box>
  );
};

export default ProgressStatus;
