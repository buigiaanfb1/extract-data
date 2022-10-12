import { useCrawlMutation } from 'app/services/keyword';
import { setLoading } from 'features/keyword/keywordSlice';
import { useKeywords } from 'hooks/useKeyword';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import classes from './styles.module.scss';

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const [crawl] = useCrawlMutation();
  const getAllKeywords = useKeywords();

  const [file, setFile] = useState<any>(null);
  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    const files = e.target.files;
    if (!files) return;
    setFile(e.target.files[0]);
  };

  const csvFileToArray = async (string: string) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

    const array: any = csvRows.map((i) => {
      const values = i.split(',');
      const obj = csvHeader.reduce((object: any, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    let keywords: Array<string> = [];

    array.map((item: any) =>
      Object.values(item).map((val: any) => keywords.push(val.split('\r')[0]))
    );
    toast('Uploading...');
    await crawl({ keywords }).unwrap();
    dispatch(setLoading());
    getAllKeywords();
    toast('Done!');
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div>
      <form>
        <div className={classes.imageUploadWrapper}>
          <div className={classes.imageUploadFlex}>
            <label htmlFor="csvFileInput">
              <div className={classes.imageUpload}>
                <i
                  className="attach-doc fa fa-paperclip fa-2x"
                  aria-hidden="true"
                ></i>
                <p>{file ? file.name : '.csv file'}</p>
              </div>
            </label>
            {file && (
              <div className={classes.buttonUpload} onClick={handleOnSubmit}>
                <h5>Upload</h5>
              </div>
            )}
          </div>
          <input
            type={'file'}
            id={'csvFileInput'}
            style={{ display: 'none' }}
            accept={'.csv'}
            onChange={handleOnChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Upload;
