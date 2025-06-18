import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scannerMode, setScannerMode] = useState<"barcode" | "ocr">("barcode");
  const isFocused = useIsFocused();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", color: "white" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScannedData(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  };

  const handleOcrScan = async () => {
    alert(
      "OCR functionality requires a cloud service. This is a placeholder for taking a picture."
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            scannerMode === "barcode" && styles.activeMode,
          ]}
          onPress={() => {
            setScannerMode("barcode");
            setScannedData(null);
          }}
        >
          <Text style={styles.modeText}>Barcode/QR Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            scannerMode === "ocr" && styles.activeMode,
          ]}
          onPress={() => setScannerMode("ocr")}
        >
          <Text style={styles.modeText}>OCR Receipt</Text>
        </TouchableOpacity>
      </View>

      {scannerMode === "barcode" ? (
        <View style={styles.cameraContainer}>
          {/* 3. Only render CameraView when the screen is focused */}
          {isFocused && (
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing={"back"}
              onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
            />
          )}
          <View style={styles.barcodeMessageContainer}>
            {scannedData && (
              <Text style={styles.scannedDataText}>{scannedData}</Text>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.ocrContainer}>
          <Text style={styles.ocrText}>
            Point your camera at a receipt and press the button below.
          </Text>
          <Button title="Scan Receipt" onPress={handleOcrScan} />
        </View>
      )}

      {scannedData && scannerMode === "barcode" && (
        <View style={styles.scanAgainButton}>
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScannedData(null)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00494f",
  },
  cameraContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "black",
  },
  barcodeMessageContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 1,
  },
  scannedDataText: {
    fontSize: scale(14),
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  modeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#003a3f",
    paddingVertical: verticalScale(10),
  },
  modeButton: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    marginHorizontal: scale(5),
    borderRadius: 5,
  },
  activeMode: {
    backgroundColor: "#00bcd4",
  },
  modeText: {
    color: "white",
    fontWeight: "bold",
  },
  ocrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  ocrText: {
    color: "white",
    fontSize: scale(16),
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
  scanAgainButton: {
    padding: 20,
    backgroundColor: "#00494f",
  },
});
