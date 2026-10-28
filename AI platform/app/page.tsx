import { siteHTML } from './site-content';
import { StudioLoader } from './studio-loader';
export default function Page(){return <><div dangerouslySetInnerHTML={{__html:siteHTML}}/><StudioLoader/></>}
