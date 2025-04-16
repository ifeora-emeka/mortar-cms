'use client'
import React from "react";
import StyledComponentsRegistry from "./components/registry";
import { ThemeProvider } from "./components/theme-provider";
import styled from "styled-components";
import { ToastProvider } from "./components/ToastProvider";
import RootPage from "./pages/RootPage";

const ContentWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

type Props = {
  segments: string[];
}

export function AdminDashboard({segments}: Props) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <ToastProvider>
          <ContentWrapper>
            <RootPage segments={segments} />
          </ContentWrapper>
        </ToastProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
