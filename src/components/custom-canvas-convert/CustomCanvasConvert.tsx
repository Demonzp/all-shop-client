import { useRef, useState } from 'react';
import { IFileData } from '../custom-img-pick/CustomImgPick';

type Props = {
  file: IFileData,
  delImg: (id: string)=>void,
  callBack: (file: IFileData)=>void
};

//1920×1080

const CustomCunvasConvert: React.FC<Props> = ({ file, delImg, callBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const refCanv = useRef<HTMLCanvasElement>(null);

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //console.log('onLoad befor');
    if(isLoaded){
      return;
    }
    //console.log('onLoad');
    const ctx = refCanv.current?.getContext('2d');
    const oWidth = e.currentTarget.width;
    const oHeight = e.currentTarget.height;

    const maxW = 1920;
    const maxH = 1080;


    let width = oWidth;
    let height = oHeight;

    //console.log(width, '|', height);

    if (width > maxW) {
      if (width > height) {
        height = (height / width) * maxW;
      } else {
        height = (height / width) * maxH;
      }
      width = maxW;
    }

    if (height > maxH) {
      width = (width / height) * maxH;
      height = maxH;
    }


    if (refCanv.current) {
      refCanv.current.width = width;
      refCanv.current.height = height;
    }

    if (ctx) {
      ctx.drawImage(e.currentTarget, 0, 0, width, height);
      ctx.font = '22px serif';
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.strokeText('all-shop.com.com', width - 200, height - 60);
      ctx.strokeText('all-shop.com.com', 0 + 200, 0 + 60);

      refCanv.current?.toBlob((blob)=>{
        if(blob){
          callBack({
            name: file.name,
            id: file.id,
            file: blob
          });
          setIsLoaded(true);
        }
      });
      //const fileDate = refCanv.current?.toDataURL("image/png");
      
    }

    URL.revokeObjectURL(e.currentTarget.src);
  };

  //canvas.toDataURL("image/png");

  return (
    <div key={file.id} className="img-pick-cont">
      <canvas ref={refCanv} style={{display:'none'}}></canvas>
      <img
        alt="..."
        //style={{display:'none'}}
        className="img-pick-img"
        src={URL.createObjectURL(file.file)}
        onLoad={onLoad}
      />
      <div>
        <div
          className="material-icons img-pick-ico-btn"
          onClick={()=>delImg(file.id)}
        >
          delete
        </div>
      </div>
    </div>

  );
};

export default CustomCunvasConvert;