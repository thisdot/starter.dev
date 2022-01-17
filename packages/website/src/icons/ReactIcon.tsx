export interface Props {
  className?: string;
}

export function ReactIcon({ className }: Props) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M39.4656 16.842C38.9547 16.6667 38.4396 16.5043 37.9206 16.355C38.0077 15.9988 38.088 15.6468 38.1593 15.3011C39.3289 9.6234 38.5642 5.04934 35.9526 3.54334C33.4485 2.09959 29.3533 3.60503 25.2174 7.20447C24.8098 7.55984 24.4113 7.92546 24.0221 8.30097C23.7616 8.05127 23.4965 7.80641 23.2269 7.56653C18.8923 3.71791 14.5476 2.09584 11.9387 3.60615C9.43688 5.0544 8.69606 9.35434 9.74906 14.7352C9.85382 15.2681 9.97211 15.7983 10.1038 16.3252C9.48881 16.5 8.89537 16.686 8.32744 16.884C3.24544 18.6558 0 21.4325 0 24.3127C0 27.2874 3.48413 30.2711 8.77725 32.0803C9.20637 32.2264 9.63907 32.3617 10.0749 32.4862C9.93338 33.0537 9.8077 33.6251 9.69806 34.1996C8.69419 39.4871 9.47812 43.6854 11.9732 45.1245C14.5502 46.6106 18.8754 45.0832 23.0869 41.4017C23.4284 41.1023 23.7624 40.7946 24.0885 40.4786C24.5099 40.8852 24.9426 41.28 25.386 41.6625C29.4656 45.1728 33.4946 46.5903 35.9873 45.1473C38.5618 43.6569 39.3986 39.1468 38.3122 33.6596C38.2267 33.2297 38.1307 32.802 38.0244 32.3767C38.3282 32.2867 38.6263 32.1941 38.9169 32.0977C44.4197 30.2747 48 27.3272 48 24.3127C48 21.422 44.6497 18.6266 39.4656 16.842ZM38.2721 30.1515C38.0096 30.2383 37.7404 30.3221 37.4659 30.4037C36.8584 28.4805 36.0386 26.4356 35.0353 24.3227C35.9927 22.2602 36.7809 20.2413 37.3714 18.3307C37.8624 18.4728 38.3389 18.6227 38.7982 18.7807C43.2401 20.31 45.9495 22.5707 45.9495 24.3127C45.9495 26.1682 43.0234 28.577 38.2721 30.1515ZM36.3008 34.0578C36.7811 36.4841 36.8496 38.6778 36.5314 40.3929C36.2456 41.934 35.6707 42.9613 34.9597 43.3728C33.4472 44.2485 30.2122 43.1103 26.7234 40.1081C26.311 39.7525 25.9085 39.3855 25.5165 39.0075C26.8691 37.5283 28.2208 35.8087 29.5401 33.8988C31.8606 33.693 34.0528 33.3562 36.0409 32.8967C36.1388 33.2917 36.2257 33.6791 36.3008 34.0578ZM16.3643 43.2215C14.8864 43.7433 13.7092 43.7583 12.9977 43.3481C11.4836 42.4749 10.8542 39.1038 11.7127 34.5821C11.8148 34.0478 11.9317 33.5164 12.0632 32.9885C14.0293 33.4235 16.2056 33.7363 18.5316 33.9249C19.8598 35.7937 21.2505 37.5114 22.6521 39.0155C22.3542 39.3037 22.0493 39.5846 21.7376 39.8578C19.8752 41.4857 18.009 42.6407 16.3643 43.2215ZM9.44062 30.14C7.10006 29.34 5.16713 28.3003 3.84225 27.1657C2.65163 26.1463 2.05069 25.134 2.05069 24.3127C2.05069 22.5648 4.65637 20.3355 9.00244 18.8203C9.52987 18.6365 10.0819 18.4631 10.6547 18.3003C11.2554 20.2541 12.0433 22.2969 12.9941 24.3626C12.0309 26.4588 11.2318 28.5343 10.6252 30.5111C10.2274 30.3971 9.8324 30.2734 9.44062 30.14ZM11.7615 14.3413C10.8594 9.73122 11.4585 6.25365 12.9662 5.38084C14.5719 4.45122 18.1228 5.77665 21.8655 9.09991C22.1096 9.3171 22.3497 9.5387 22.5857 9.76459C21.1911 11.2622 19.8131 12.9671 18.4967 14.8248C16.2392 15.0341 14.0782 15.3701 12.0915 15.8203C11.9691 15.3302 11.8591 14.8371 11.7615 14.3415V14.3413ZM32.4666 19.454C31.9973 18.6435 31.5106 17.8431 31.0069 17.0535C32.5384 17.2472 34.0057 17.5042 35.3837 17.8185C34.9701 19.1445 34.4544 20.5307 33.8475 21.9519C33.4039 21.1102 32.9435 20.2774 32.4666 19.454ZM24.0231 11.2301C24.9688 12.2548 25.9161 13.3987 26.8478 14.64C24.9578 14.5507 23.0646 14.5503 21.1746 14.6388C22.1072 13.409 23.0625 12.2666 24.0231 11.2301ZM15.5254 19.4681C15.0544 20.2848 14.6026 21.1124 14.1703 21.9502C13.5733 20.534 13.0624 19.1415 12.6452 17.7967C14.0147 17.4903 15.4751 17.2398 16.9969 17.0497C16.4875 17.8442 15.9969 18.6504 15.5254 19.4679V19.4681ZM17.0406 31.7216C15.4684 31.5461 13.986 31.3085 12.6169 31.0104C13.0406 29.6417 13.5628 28.2195 14.1727 26.7729C14.6068 27.6113 15.0605 28.4394 15.5334 29.2565C16.0198 30.0965 16.5234 30.9193 17.0406 31.7216ZM24.0797 37.5397C23.1077 36.4912 22.1383 35.3312 21.1916 34.0835C22.1108 34.1195 23.0477 34.1379 24 34.1379C24.9784 34.1379 25.9455 34.116 26.8974 34.0736C25.9628 35.3437 25.0191 36.5055 24.0797 37.5397ZM33.8668 26.699C34.5084 28.1615 35.0492 29.5762 35.4786 30.9215C34.0869 31.2392 32.5843 31.4949 31.0011 31.6848C31.5084 30.8806 31.9997 30.0663 32.4746 29.2425C32.9575 28.4051 33.4217 27.5571 33.8668 26.699ZM30.6984 28.218C29.9713 29.481 29.2034 30.7201 28.3958 31.9333C26.9328 32.0369 25.4666 32.0884 24 32.0876C22.5062 32.0876 21.0532 32.0411 19.6541 31.9503C18.8254 30.74 18.0428 29.4987 17.3079 28.2292H17.3081C16.5767 26.9664 15.8935 25.6763 15.2601 24.3617C15.8919 23.0467 16.573 21.756 17.3019 20.4922L17.3018 20.4924C18.0304 19.2283 18.8067 17.9924 19.6292 16.7872C21.0566 16.6792 22.5204 16.623 23.9998 16.623H24C25.4861 16.623 26.9518 16.6798 28.3789 16.7885C29.193 17.9919 29.9644 19.2236 30.6917 20.4813C31.423 21.7423 32.1131 23.0267 32.7609 24.3326C32.1198 25.6518 31.4318 26.9477 30.6984 28.218ZM34.9284 5.31972C36.5357 6.24672 37.1608 9.9849 36.1509 14.8871C36.0864 15.1998 36.0141 15.5184 35.9353 15.8415C33.9437 15.3817 31.7812 15.0399 29.5172 14.8275C28.1983 12.9493 26.8316 11.2417 25.4597 9.76347C25.8192 9.41687 26.1874 9.07927 26.5637 8.75097C30.1074 5.66716 33.4194 4.44953 34.9284 5.31972ZM24 20.0265C26.3672 20.0265 28.2863 21.9455 28.2863 24.3127C28.2863 26.6799 26.3672 28.599 24 28.599C21.6328 28.599 19.7137 26.6799 19.7137 24.3127C19.7137 21.9455 21.6328 20.0265 24 20.0265Z"
        fill="#00D8FF"
      />
    </svg>
  );
}
