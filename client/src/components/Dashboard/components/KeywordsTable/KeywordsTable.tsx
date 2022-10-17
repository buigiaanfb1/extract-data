import { useSearchMutation } from 'app/services/keyword';
import Modal from 'components/atoms/Modal/Modal';
import Search from 'components/atoms/Search/Search';
import {
  clearKeywords,
  selectKeywords,
  setKeywords,
  setLoading,
} from 'features/keyword/keywordSlice';
import { useKeywords } from 'hooks/useKeyword';
import useModal from 'hooks/useModal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './styles.module.scss';

const KeywordsTable: React.FC = () => {
  const dispatch = useDispatch();
  const getAllKeywords = useKeywords();
  const { isShowing, toggle } = useModal();
  const keywords = useSelector(selectKeywords);
  const [search] = useSearchMutation();

  const [rawHTML, setRawHTML] = useState<string | null>(null);

  useEffect(() => {
    getAllKeywords();

    return () => {
      dispatch(clearKeywords());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetRawHTML = (content: string | null) => {
    setRawHTML(content);
    toggle();
  };

  const handleSearch = async (value: string) => {
    dispatch(setLoading());
    const response = await search({ keyword: value }).unwrap();
    dispatch(setKeywords({ data: response.data }));
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Search onSearch={handleSearch} />
        {!keywords.isLoading ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Keyword</th>
                <th scope="col">Total results</th>
                <th scope="col">Links</th>
                <th scope="col">Ads</th>
                <th scope="col">Raw HTML</th>
              </tr>
            </thead>
            <tbody>
              {keywords &&
                keywords.data.map((keyword) => (
                  <tr key={keyword.id}>
                    <th scope="row">{keyword.id}</th>
                    <td>{keyword.keyword}</td>
                    <td>
                      {keyword.isCompleted
                        ? keyword.totalResultsOfKeyword
                        : 'Loading...'}
                    </td>
                    <td>
                      {keyword.isCompleted
                        ? keyword.numberOfLinks
                        : 'Loading...'}
                    </td>
                    <td>
                      {keyword.isCompleted
                        ? keyword.totalAdWordsAdvertisers
                        : 'Loading...'}
                    </td>
                    <td>
                      {keyword.isCompleted ? (
                        <button
                          onClick={() => handleSetRawHTML(keyword.rawHTML)}
                        >
                          Raw HTML
                        </button>
                      ) : (
                        'Loading...'
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>
            {keywords.data.length === 0
              ? 'No results at all! Please upload and crawl some keyword'
              : 'Loading...'}
          </p>
        )}
      </div>
      <Modal isShowing={isShowing} hide={toggle} content={rawHTML} />
    </>
  );
};

export default React.memo(KeywordsTable);
