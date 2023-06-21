import { BiPlus } from 'react-icons/bi';
import { RxBorderSolid } from 'react-icons/rx';

export default function IncrementButton() {
    return (
        <>
            <button>
                <RxBorderSolid />
            </button>
            <button>
                <BiPlus />
            </button>
        </>
    );
}
