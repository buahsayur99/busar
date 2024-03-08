import React from "react";
import styles from "../../../style/index.module.scss";
import { DataPaymentProps, PaymentBankProps, PaymentStoreProps } from "../../../app/actions/apiPaymentSlice";
import { mandiri, bca, bri, bni, permata, cimb, alfamart, indomart } from "../../../assets/bankPayment/index";
import { RiFileCopy2Line } from "../../../utils/icons";
import { formattedNumber } from "../../../utils/convert";
import { ButtonTooltipCss } from "../../../components/ButtonTooltipCss";
import { useApiPayment } from "../../../hook/useApiPayment";

type CardDetailPaymentProps = {
  detailPayment: DataPaymentProps
}

export const CardDetailPayment = ({ detailPayment }: CardDetailPaymentProps) => {
  const { handelSnap } = useApiPayment();

  const uiBankPayment = (data_payment: PaymentBankProps | PaymentStoreProps) => {
    // Handle Ui Bank Mandiri
    if (data_payment.payment_type === "echannel" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "mandiri") {
      return (
        <div className={styles["parent-type-bank"]}>
          <p>mandiri virtual account</p>
          <div className={styles["img-bank"]}>
            <img src={mandiri} alt="mandiri" width={70} />
          </div>
        </div >
      )
    }
    // Handle Ui Bank BCA
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bca") {
      return (
        <div className={styles["parent-type-bank"]}>
          <p>BCA virtual account</p>
          <div className={styles["img-bank"]}>
            <img src={bca} alt="bca" width={70} />
          </div>
        </div >
      )
    }
    // Handle Ui Bank BRI
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bri") {
      return (
        <div className={styles["parent-type-bank"]}>
          <p>BRI virtual account</p>
          <div className={styles["img-bank"]}>
            <img src={bri} alt="bri" width={30} />
          </div>
        </div >
      )
    }
    // Handle Ui Bank BNI
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bni") {
      return (
        <div className={styles["parent-type-bank"]}>
          <p>BNI virtual account</p>
          <div className={styles["img-bank"]}>
            <img src={bni} alt="bni" width={50} />
          </div>
        </div >
      )
    }
    // Handle Ui Bank Permata
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "permata") {
      return (
        <div className={styles["parent-type-bank"]}>
          <p>permata virtual account</p>
          <div className={styles["img-bank"]}>
            <img className={styles["bank-permata"]} src={permata} alt="permata" width={90} />
          </div>
        </div >
      )
    }
    // Handle Ui Bank CIMB Niaga
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "cimb") {
      return (
        <div className={styles["parent-type-bank"]}>
          <p>CIMB niaga virtual account</p>
          <div className={styles["img-bank"]}>
            <img className={styles["bank-cimb"]} src={cimb} alt="cimb" width={90} />
          </div>
        </div >
      )
    }
    // Handle Ui Store Alfamart
    if (data_payment.payment_type === "cstore" && (data_payment as PaymentStoreProps).payment_va_numbers.payment_store === "alfamart") {
      return (
        <div className={styles["parent-type-bank"]}>
          <p>alfamart virtual account</p>
          <div className={styles["img-bank"]}>
            <img className={styles["bank-cimb"]} src={alfamart} alt="alfamart" width={60} />
          </div>
        </div >
      )
    }
    // Handle Ui Store Indomart
    if (data_payment.payment_type === "cstore" && (data_payment as PaymentStoreProps).payment_va_numbers.payment_store === "indomaret") {
      return (
        <div className={styles["parent-type-bank"]}>
          <p>indomaret payment code</p>
          <div className={styles["img-bank"]}>
            <img className={styles["bank-cimb"]} src={indomart} alt="alfamart" width={60} />
          </div>
        </div >
      )
    }
  }

  const uiVirtualAccount = (data_payment: PaymentBankProps | PaymentStoreProps) => {
    // Handle Ui Bank Mandiri
    if (data_payment.payment_type === "echannel" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "mandiri") {
      return (
        <div className={styles["parent-nomor-virtual-account"]}>
          <h4>Nomor Virtual Account</h4>
          <div className={styles["nomor"]}>
            <p>{(data_payment as PaymentBankProps).payment_va_numbers.bill_key}</p>
            <div
              className={styles["parent-button-salin"]}
              onClick={() => copyToClipboard((data_payment as PaymentBankProps).payment_va_numbers.bill_key)}
            >
              <button
                type="button"
                aria-label="salin"
              >
                salin
              </button>
              <ButtonTooltipCss
                arialLabel="copy virtual account"
                classNameButton="button-copy-virtual-account"
                classNameTooltip="tooltip-virtual-account"
                textTooltip={"copy virtual account"}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>
          </div>
        </div>
      )
    }
    // Handle Ui Bank BCA
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bca") {
      return (
        <div className={styles["parent-nomor-virtual-account"]}>
          <h4>Nomor Virtual Account</h4>
          <div className={styles["nomor"]}>
            <p>{(data_payment as PaymentBankProps).payment_va_numbers.va_number}</p>
            <div
              className={styles["parent-button-salin"]}
              onClick={() => copyToClipboard((data_payment as PaymentBankProps).payment_va_numbers.va_number)}
            >
              <button
                type="button"
                aria-label="salin"
              >
                salin
              </button>
              <ButtonTooltipCss
                arialLabel="copy virtual account"
                classNameButton="button-copy-virtual-account"
                classNameTooltip="tooltip-virtual-account"
                textTooltip={"copy virtual account"}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>
          </div>
        </div>
      )
    }
    // Handle Ui Bank BRI
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bri") {
      return (
        <div className={styles["parent-nomor-virtual-account"]}>
          <h4>Nomor Virtual Account</h4>
          <div className={styles["nomor"]}>
            <p>{(data_payment as PaymentBankProps).payment_va_numbers.va_number}</p>
            <div
              className={styles["parent-button-salin"]}
              onClick={() => copyToClipboard((data_payment as PaymentBankProps).payment_va_numbers.va_number)}
            >
              <button
                type="button"
                aria-label="salin"
              >
                salin
              </button>
              <ButtonTooltipCss
                arialLabel="copy virtual account"
                classNameButton="button-copy-virtual-account"
                classNameTooltip="tooltip-virtual-account"
                textTooltip={"copy virtual account"}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>
          </div>
        </div>
      )
    }
    // Handle Ui Bank BNI
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bni") {
      return (
        <div className={styles["parent-nomor-virtual-account"]}>
          <h4>Nomor Virtual Account</h4>
          <div className={styles["nomor"]}>
            <p>{(data_payment as PaymentBankProps).payment_va_numbers.va_number}</p>
            <div
              className={styles["parent-button-salin"]}
              onClick={() => copyToClipboard((data_payment as PaymentBankProps).payment_va_numbers.va_number)}
            >
              <button
                type="button"
                aria-label="salin"
              >
                salin
              </button>
              <ButtonTooltipCss
                arialLabel="copy virtual account"
                classNameButton="button-copy-virtual-account"
                classNameTooltip="tooltip-virtual-account"
                textTooltip={"copy virtual account"}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>
          </div>
        </div>
      )
    }
    // Handle Ui Bank Permata
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "permata") {
      return (
        <div className={styles["parent-nomor-virtual-account"]}>
          <h4>Nomor Virtual Account</h4>
          <div className={styles["nomor"]}>
            <p>{(data_payment as PaymentBankProps).payment_va_numbers.va_number}</p>
            <div
              className={styles["parent-button-salin"]}
              onClick={() => copyToClipboard((data_payment as PaymentBankProps).payment_va_numbers.va_number)}
            >
              <button
                type="button"
                aria-label="salin"
              >
                salin
              </button>
              <ButtonTooltipCss
                arialLabel="copy virtual account"
                classNameButton="button-copy-virtual-account"
                classNameTooltip="tooltip-virtual-account"
                textTooltip={"copy virtual account"}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>
          </div>
        </div>
      )
    }
    // Handle Ui Bank CIMB Niaga
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "cimb") {
      return (
        <div className={styles["parent-nomor-virtual-account"]}>
          <h4>Nomor Virtual Account</h4>
          <div className={styles["nomor"]}>
            <p>{(data_payment as PaymentBankProps).payment_va_numbers.va_number}</p>
            <div
              className={styles["parent-button-salin"]}
              onClick={() => copyToClipboard((data_payment as PaymentBankProps).payment_va_numbers.va_number)}
            >
              <button
                type="button"
                aria-label="salin"
              >
                salin
              </button>
              <ButtonTooltipCss
                arialLabel="copy virtual account"
                classNameButton="button-copy-virtual-account"
                classNameTooltip="tooltip-virtual-account"
                textTooltip={"copy virtual account"}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>
          </div>
        </div>
      )
    }
    // Handle Ui Store Alfamart
    if (data_payment.payment_type === "cstore" && (data_payment as PaymentStoreProps).payment_va_numbers.payment_store === "alfamart") {
      return (
        <div className={styles["parent-nomor-virtual-account"]}>
          <h4>Nomor Virtual Account</h4>
          <div className={styles["nomor"]}>
            <p>{(data_payment as PaymentStoreProps).payment_va_numbers.payment_code}</p>
            <div
              className={styles["parent-button-salin"]}
              onClick={() => copyToClipboard((data_payment as PaymentStoreProps).payment_va_numbers.payment_code)}
            >
              <button
                type="button"
                aria-label="salin"
              >
                salin
              </button>
              <ButtonTooltipCss
                arialLabel="copy virtual account"
                classNameButton="button-copy-virtual-account"
                classNameTooltip="tooltip-virtual-account"
                textTooltip={"copy virtual account"}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>
          </div>
        </div>
      )
    }
    // Handle Ui Store indomart
    if (data_payment.payment_type === "cstore" && (data_payment as PaymentStoreProps).payment_va_numbers.payment_store === "indomaret") {
      return (
        <div className={styles["parent-nomor-virtual-account"]}>
          <h4>nomor payment code</h4>
          <div className={styles["nomor"]}>
            <p>{(data_payment as PaymentStoreProps).payment_va_numbers.payment_code}</p>
            <div
              className={styles["parent-button-salin"]}
              onClick={() => copyToClipboard((data_payment as PaymentStoreProps).payment_va_numbers.payment_code)}
            >
              <button
                type="button"
                aria-label="salin"
              >
                salin
              </button>
              <ButtonTooltipCss
                arialLabel="copy virtual account"
                classNameButton="button-copy-virtual-account"
                classNameTooltip="tooltip-virtual-account"
                textTooltip={"copy virtual account"}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>
          </div>
        </div>
      )
    }
  }

  const uiTotalPayment = (data_payment: PaymentBankProps | PaymentStoreProps) => {
    // Handle Ui Bank Mandiri
    if (data_payment.payment_type === "echannel" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "mandiri") {
      return (
        <div className={styles["parent-total-payment"]}>
          <h4>Total Pembayaran</h4>
          <div className={styles["total-payment"]}>
            <div className={styles["price"]}>
              <p>{`rp${formattedNumber(detailPayment.total_price)}`}</p>
              <ButtonTooltipCss
                arialLabel="copy total payment"
                classNameButton="button-copy-total-payment"
                classNameTooltip="tooltip-button"
                textTooltip={"copy total price"}
                onClicks={() => copyToClipboard(detailPayment.total_price)}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>

            <button
              type="button"
              className={styles["button-view-detail"]}
              onClick={() => handelSnap(detailPayment.snap_token, detailPayment.transaction_id)}
            >
              lihat detail
            </button>
          </div>
        </div>
      )
    }
    // Handle Ui Bank BCA
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bca") {
      return (
        <div className={styles["parent-total-payment"]}>
          <h4>Total Pembayaran</h4>

          <div className={styles["total-payment"]}>
            <div className={styles["price"]}>
              <p>{`rp${formattedNumber(detailPayment.total_price)}`}</p>
              <ButtonTooltipCss
                arialLabel="copy total payment"
                classNameButton="button-copy-total-payment"
                classNameTooltip="tooltip-button"
                textTooltip={"copy total price"}
                onClicks={() => copyToClipboard(detailPayment.total_price)}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>

            <button
              type="button"
              className={styles["button-view-detail"]}
              onClick={() => handelSnap(detailPayment.snap_token, detailPayment.transaction_id)}
            >
              lihat detail
            </button>
          </div>
        </div>
      )
    }
    // Handle Ui Bank BRI
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bri") {
      return (
        <div className={styles["parent-total-payment"]}>
          <h4>Total Pembayaran</h4>

          <div className={styles["total-payment"]}>
            <div className={styles["price"]}>
              <p>{`rp${formattedNumber(detailPayment.total_price)}`}</p>
              <ButtonTooltipCss
                arialLabel="copy total payment"
                classNameButton="button-copy-total-payment"
                classNameTooltip="tooltip-button"
                textTooltip={"copy total price"}
                onClicks={() => copyToClipboard(detailPayment.total_price)}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>

            <button
              type="button"
              className={styles["button-view-detail"]}
              onClick={() => handelSnap(detailPayment.snap_token, detailPayment.transaction_id)}
            >
              lihat detail
            </button>
          </div>
        </div>
      )
    }
    // Handle Ui Bank BNI
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "bni") {
      return (
        <div className={styles["parent-total-payment"]}>
          <h4>Total Pembayaran</h4>

          <div className={styles["total-payment"]}>
            <div className={styles["price"]}>
              <p>{`rp${formattedNumber(detailPayment.total_price)}`}</p>
              <ButtonTooltipCss
                arialLabel="copy total payment"
                classNameButton="button-copy-total-payment"
                classNameTooltip="tooltip-button"
                textTooltip={"copy total price"}
                onClicks={() => copyToClipboard(detailPayment.total_price)}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>

            <button
              type="button"
              className={styles["button-view-detail"]}
              onClick={() => handelSnap(detailPayment.snap_token, detailPayment.transaction_id)}
            >
              lihat detail
            </button>
          </div>
        </div>
      )
    }
    // Handle Ui Bank Permata
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "permata") {
      return (
        <div className={styles["parent-total-payment"]}>
          <h4>Total Pembayaran</h4>

          <div className={styles["total-payment"]}>
            <div className={styles["price"]}>
              <p>{`rp${formattedNumber(detailPayment.total_price)}`}</p>
              <ButtonTooltipCss
                arialLabel="copy total payment"
                classNameButton="button-copy-total-payment"
                classNameTooltip="tooltip-button"
                textTooltip={"copy total price"}
                onClicks={() => copyToClipboard(detailPayment.total_price)}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>

            <button
              type="button"
              className={styles["button-view-detail"]}
              onClick={() => handelSnap(detailPayment.snap_token, detailPayment.transaction_id)}
            >
              lihat detail
            </button>
          </div>
        </div>
      )
    }
    // Handle Ui Bank CIMB Niaga
    if (data_payment.payment_type === "bank_transfer" && (data_payment as PaymentBankProps).payment_va_numbers.bank === "cimb") {
      return (
        <div className={styles["parent-total-payment"]}>
          <h4>Total Pembayaran</h4>

          <div className={styles["total-payment"]}>
            <div className={styles["price"]}>
              <p>{`rp${formattedNumber(detailPayment.total_price)}`}</p>
              <ButtonTooltipCss
                arialLabel="copy total payment"
                classNameButton="button-copy-total-payment"
                classNameTooltip="tooltip-button"
                textTooltip={"copy total price"}
                onClicks={() => copyToClipboard(detailPayment.total_price)}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>

            <button
              type="button"
              className={styles["button-view-detail"]}
              onClick={() => handelSnap(detailPayment.snap_token, detailPayment.transaction_id)}
            >
              lihat detail
            </button>
          </div>
        </div>
      )
    }
    // Handle Ui Store Alfamart
    if (data_payment.payment_type === "cstore" && (data_payment as PaymentStoreProps).payment_va_numbers.payment_store === "alfamart") {
      return (
        <div className={styles["parent-total-payment"]}>
          <h4>Total Pembayaran</h4>

          <div className={styles["total-payment"]}>
            <div className={styles["price"]}>
              <p>{`rp${formattedNumber(detailPayment.total_price)}`}</p>
              <ButtonTooltipCss
                arialLabel="copy total payment"
                classNameButton="button-copy-total-payment"
                classNameTooltip="tooltip-button"
                textTooltip={"copy total price"}
                onClicks={() => copyToClipboard(detailPayment.total_price)}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>

            <button
              type="button"
              className={styles["button-view-detail"]}
              onClick={() => handelSnap(detailPayment.snap_token, detailPayment.transaction_id)}
            >
              lihat detail
            </button>
          </div>
        </div>
      )
    }
    // Handle Ui Store Indomart
    if (data_payment.payment_type === "cstore" && (data_payment as PaymentStoreProps).payment_va_numbers.payment_store === "indomaret") {
      return (
        <div className={styles["parent-total-payment"]}>
          <h4>Total Pembayaran</h4>

          <div className={styles["total-payment"]}>
            <div className={styles["price"]}>
              <p>{`rp${formattedNumber(detailPayment.total_price)}`}</p>
              <ButtonTooltipCss
                arialLabel="copy total payment"
                classNameButton="button-copy-total-payment"
                classNameTooltip="tooltip-button"
                textTooltip={"copy total price"}
                onClicks={() => copyToClipboard(detailPayment.total_price)}
              >
                <RiFileCopy2Line />
              </ButtonTooltipCss>
            </div>

            <button
              type="button"
              className={styles["button-view-detail"]}
              onClick={() => handelSnap(detailPayment.snap_token, detailPayment.transaction_id)}
            >
              lihat detail
            </button>
          </div>
        </div>
      )
    }
  }

  const copyToClipboard = (nomorVirtualAccount: any) => {
    navigator.clipboard.writeText(nomorVirtualAccount)
      .then(() => {
        alert(`Nomor Virtual Account ${nomorVirtualAccount} berhasil disalin!`);
      })
      .catch(err => {
        console.error('Gagal untuk menyalin:', err);
      });
  };

  return (
    <>
      <div className={styles["container-card-detail-payment"]}>
        {uiBankPayment(detailPayment.data_payment)}

        <div className={styles["parent_nomor-account_total-payment"]}>
          {uiVirtualAccount(detailPayment.data_payment)}

          {uiTotalPayment(detailPayment.data_payment)}
        </div>
      </div>
    </>
  )
}
