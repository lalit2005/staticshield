import { HarperDBRecord } from '../types/interfaces';

const sortSiteCardsByUpdatedDate = (data: HarperDBRecord[]) => {
  const sortedData = data.sort((a, b) => {
    return (
      new Date(b.__updatedtime__).valueOf() -
      new Date(a.__updatedtime__).valueOf()
    );
  });
  return sortedData;
};

export default sortSiteCardsByUpdatedDate;
