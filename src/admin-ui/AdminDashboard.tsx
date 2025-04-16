'use client'
import React from "react";
import StyledComponentsRegistry from "./components/registry";
import {ThemeProvider} from "./components/theme-provider";
import {CollectionListPage} from "./pages/collection-list/CollectionListPage";
import styled from "styled-components";
import ToastProvider from "./components/ToastProvider";

// Content wrapper to ensure proper positioning
const ContentWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

export function AdminDashboard(){
    return (
      <StyledComponentsRegistry>
        <ThemeProvider>
          <ToastProvider>
            <ContentWrapper>
              <CollectionListPage/>
            </ContentWrapper>
          </ToastProvider>
        </ThemeProvider>
      </StyledComponentsRegistry>
    );
}
