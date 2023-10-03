import Main from '../../pages/main/main';
import Card from '../card/card';
type ImgProps={
    imgPath:string,
    imgName:string
  }
function App({imgPath,imgName}: ImgProps): JSX.Element{
    return(
     <Card imgPath={imgPath} imgName={imgName} />
    );
}
export default App