import { ThemeProvider } from 'styled-components';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import App2 from './App2';
import App3 from './App3';
import {
  AVATAR_VARIANTS,
  HeaderContextMenuContent,
  IconAccountCircle,
  IconLogo,
  IconPerson,
  IconRepairOrder,
  MenuWrapper,
  NavigationContainer,
  NavigationContextSwitcher,
  NavigationFooter,
  NavigationHeader,
  NavigationMenu,
  SideContentWrapper,
  getHexToRgb,
  getRem,
  isMobileScreen,
  theme,
  useMountEffect,
  useOutsideClickEventListener,
  useWindowSize,
  IconChat
} from 'cdk-radial';
const StyledContextSwitcherContainer = styled.div`
  border-bottom: 1px solid rgba(___CSS_0___, 0.25);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-bottom: ___CSS_1___;
  padding-top: ___CSS_2___;
  z-index: ___CSS_3___;
`;

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeMenuItemId, setActiveMenuItemId] = useState('appointments');
  const [openSample, setOpenSample] = useState(false);
  const [expandedMenuItemIds, setExpandedMenuItemIds] = useState({
    'service-dashboard': true,
    services: true
  });
  const navigationContainerRef = useRef();
  const windowSize = useWindowSize();

  const handleCollapse = event => {
    setIsCollapsed(true);
  };

  const handleExpand = event => {
    setIsCollapsed(false);
  };

  useMountEffect(() => {
    if (isMobileScreen(windowSize.width) && !isCollapsed) {
      handleCollapse();
    }

    if (!isMobileScreen(windowSize.width) && isCollapsed) {
      handleExpand();
    }
  });
  useOutsideClickEventListener(navigationContainerRef, () => {
    if (isMobileScreen(windowSize.width)) {
      handleCollapse();
    }
  });

  const getExpandedListItemsCount = items => Object.values(items).reduce((count, value) => value ? count + 1 : count, 0);

  const handleMenuItemsExpandCollapse = itemIds => {
    const shouldItemExpandCollapse = !isCollapsed || getExpandedListItemsCount(itemIds) > getExpandedListItemsCount(expandedMenuItemIds);

    if (isCollapsed) {
      handleExpand();
    }

    if (shouldItemExpandCollapse) {
      setExpandedMenuItemIds(itemIds);
    }
  };

  const handleHelpClicked = () => {
    alert('Help clicked');
  };

  const navigationMenuItems = [{
    href: '',
    icon: <IconChat />,
    id: 'customers',
    onClick: () => {
      setActiveMenuItemId('customers');
      setOpenSample(true);
    },
    text: 'Random Word'
  }, {
    icon: <IconRepairOrder />,
    id: 'services',
    items: [{
      id: 'service-dashboard',
      items: [{
        href: '',
        id: 'appointments',
        onClick: () => {
          setActiveMenuItemId('appointments');
          setOpenSample(false);
        },
        text: 'Appointments'
      }, {
        href: '',
        id: 'open-repairs',
        onClick: () => {
          setOpenSample(false);
          setActiveMenuItemId('open-repairs');
        },
        text: 'Open Repairs'
      }],
      text: 'Service Dashboard'
    }, {
      href: '',
      id: 'settings',
      onClick: () => {
        setActiveMenuItemId('settings');
        setOpenSample(false);
      },
      text: 'Settings'
    }],
    text: 'Services'
  }];
  const avatarProps = {
    label: 'Rusty Shakelford',
    variant: AVATAR_VARIANTS.TEXT
  };
  const listItems = [{
    groupLabel: 'Group Label 1',
    id: 'group-list',
    items: [{
      href: '#link-1',
      id: 'group-1-list-item-0',
      text: 'Link 1'
    }]
  }, {
    groupLabel: 'Default Group',
    id: 'group-list-default',
    items: [{
      href: '#reset-password',
      id: 'group-default-list-item-0',
      text: 'Reset Password'
    }]
  }];

  const renderContextMenuContent = () => <HeaderContextMenuContent avatarProps={avatarProps} listItems={listItems} usernameTitle="Rusty Shakelford" />;

  return <ThemeProvider theme={theme}>
          <NavigationContainer isCollapsed={isCollapsed} ref={navigationContainerRef}>
            <NavigationHeader headerLabel="Rusty Shakelford" isCollapsed={isCollapsed} logoIcon={<IconLogo height={26} viewBox="4 4 16 16" />} renderContextMenuContent={renderContextMenuContent} />
            <StyledContextSwitcherContainer>
              <NavigationContextSwitcher defaultAvatarProps={{
          icon: <IconAccountCircle />,
          label: 'All Options',
          variant: 'icon'
        }} defaultSelectedValue="All Options" isCollapsed={isCollapsed} options={[{
          avatarProps: {
            icon: <IconAccountCircle />,
            label: 'All Options',
            variant: 'icon'
          },
          id: 'option-all-options',
          label: 'All Options'
        }, {
          avatarProps: {
            icon: <IconAccountCircle />,
            label: 'Option 1',
            variant: 'text'
          },
          href: '',
          id: 'option-1',
          label: 'Option 1'
        }]} />
            </StyledContextSwitcherContainer>
            <MenuWrapper>
              <NavigationMenu activeItemId={activeMenuItemId} expandedItemIds={expandedMenuItemIds} isCollapsed={isCollapsed} items={navigationMenuItems} onItemsExpandCollapse={handleMenuItemsExpandCollapse} />
            </MenuWrapper>
            <NavigationFooter helpLabel="Help" isCollapsed={isCollapsed} onCollapse={handleCollapse} onExpand={handleExpand} onHelpClick={handleHelpClicked} collapsedToggleLabel="Expand Navigation" expandedToggleLabel="Collapse Navigation" />
          </NavigationContainer>
          <SideContentWrapper isNavigationCollapsed={isCollapsed} style={{
      alignItems: 'center',
      backgroundColor: '#fafafa',
      display: 'flex',
      height: getRem(500),
      justifyContent: 'center',
      position: 'relative',
      width: '100%'
    }}>
      {openSample&&<App3/>}
      {!openSample&&<h1>Main content area</h1>}
          
          </SideContentWrapper>
          </ThemeProvider>;
};
export default App;