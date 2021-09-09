import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
// Additional constants import
import { AVATAR_VARIANTS, BUTTON_VARIANTS, IconAccountCircle, Loader, IconInfo, MediaCard, theme } from 'cdk-radial';

function App3()
{
    const [dictionaryData,setDictionaryData]=useState([]);
    useEffect(()=>{
        axios.get(`https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json`)
      .then(res => {    
        const responseData= res.data;
        setDictionaryData(responseData);
      })
    },[]);
    const keys = Object.keys(dictionaryData);
    const randIndex = Math.floor(Math.random() * keys.length)
    const randKey = keys[randIndex];
    return (
    <>
        {dictionaryData?(
            <ThemeProvider theme={theme}>
                <div>
                    <h1></h1>

                    <helpers__StoryCardContainer>
  <MediaCard
    avatarProps={{
      label: 'Alice',
      variant: 'text'
    }}
    buttonsProps={[
      {
        'data-testid': 'Action1-button',
        onClick: function noRefCheck(){},
        text: 'Action1',
        variant: 'text'
      },
      {
        'data-testid': 'Action2-button',
        onClick: function noRefCheck(){},
        text: 'Action2',
        variant: 'text'
      }
    ]}
    customCard=""
    customContentTag=""
    dataTestId="card"
    iconButtonProps={{
      dataTestId: 'icon-button',
      icon: <IconInfo ariaLabel="" className="" focusable={false} height={24} role="presentation" viewBox="0 0 24 24" width={24}/>,
      onClick: function noRefCheck(){},
      text: 'Button label'
    }}
    iconToggleProps={{
      checked: false,
      label: 'Subscribe',
      name: 'subscribe',
      onChange: function noRefCheck(){}
    }}
    mediaProps={{
      alt: 'Alternative image description',
      hideTitle: false,
      isSquare: false,
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/English-English_and_English-Persian_dictionaries.JPG/1280px-English-English_and_English-Persian_dictionaries.JPG',
      title: ''
    }}
    title={randKey}
  >
<h1>{dictionaryData[randKey]}</h1>
  </MediaCard>
</helpers__StoryCardContainer>
                </div>
            </ThemeProvider>
        ):(<Loader/>)}
    </>
    );
}
export default App3;